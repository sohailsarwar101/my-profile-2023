class e {
    getRandomString(e) {
        let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            s = "";
        for (let i = 0; i < e; i++) s += t.charAt(Math.floor(Math.random() * t.length));
        return s;
    }
    appendStatusNotification(e) {
        const t = "start" === e ? "Recording Started" : "stop" === e ? "Recording Stopped" : "";
        (this.set.toast.textContent = t),
            this.set.toast.classList.add("active"),
            setTimeout(() => {
                this.set.toast.classList.remove("active");
            }, 2e3);
    }
    createRecorder(e) {
        let t = [];
        return (
            (this.set.mediaRecorder = new MediaRecorder(e)),
            (this.set.mediaRecorder.ondataavailable = (e) => {
                e.data.size > 0 && t.push(e.data);
            }),
            (this.set.mediaRecorder.onstop = () => {
                this.bakeVideo(t), (t = []);
            }),
            this.set.mediaRecorder.start(15),
            this.set.mediaRecorder
        );
    }
    async recordScreen() {
        try {
        return await navigator.mediaDevices.getDisplayMedia({ audio: !0, video: { mediaSource: "screen" } });
        } catch(err) {
            alert("Sorry! Screen Recording request disallowed from the browser. It should be allowed, if you want to record screen video.");
        }
    }
    bakeVideo(e) {
        const t = new Blob(e, { type: "video/" + this.set.mime });
        let s = this.getRandomString(15);
        (this.set.download.href = URL.createObjectURL(t)),
            (this.set.download.download = `${s}.${this.set.mime}`),
            this.set.videoOpacitySheet.remove(),
            (this.set.preview.autoplay = !1),
            (this.set.preview.controls = !0),
            (this.set.preview.src = URL.createObjectURL(t)),
            URL.revokeObjectURL(t);
    }
    init() {
        this.set.start.addEventListener("click", async () => {
            let e = await this.recordScreen(),
                t = "video/" + this.set.mime;
            (this.set.mediaRecorder = this.createRecorder(e, t)),
                (this.set.preview.srcObject = e),
                (this.set.preview.captureStream = this.set.preview.captureStream || this.set.preview.mozCaptureStream),
                this.set.preview.classList.add("visible"),
                this.set.stop.classList.add("visible"),
                this.set.start.classList.add("hidden"),
                this.set.videoOpacitySheet.remove(),
                this.appendStatusNotification("start");
        }),
            this.set.stop.addEventListener("click", () => {
                this.set.mediaRecorder.stop(),
                    (this.set.preview.srcObject = null),
                    this.set.stop.classList.remove("visible"),
                    this.set.download.classList.add("visible"),
                    this.set.reset.classList.add("visible"),
                    this.set.btns.classList.add("controls_wrap_btns"),
                    this.appendStatusNotification("stop");
            });
    }
    constructor() {
        return (
            e.instance ||
                ((this.set = {
                    start: document.getElementById("start"),
                    stop: document.getElementById("stop"),
                    preview: document.querySelector("#preview"),
                    download: document.querySelector("#download"),
                    reset: document.querySelector("#reset"),
                    videoOpacitySheet: document.querySelector(".video-wrap"),
                    toast: document.querySelector(".toast_msg"),
                    btns: document.querySelector(".controls_wrap"),
                    mime: "mp4",
                    mediaRecorder: null,
                }),
                (e.instance = this)),
            e.instance
        );
    }
}
const s = {};
(s.recorder = new e()), s.recorder.init();
