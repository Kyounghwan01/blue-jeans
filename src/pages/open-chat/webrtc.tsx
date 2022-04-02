import { useEffect, useState, useRef } from "react";
import ysFixWebmDuration from "fix-webm-duration";

export default function Index() {
  const [step, setStep] = useState("ready");
  const [outUrl, setOutUrl] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const videoRef = useRef(null) as any;

  useEffect(() => {
    if (!isStarted) return;

    if (navigator.mediaDevices) {
      const { MediaRecorder } = window as any;
      const constraints = { audio: true, video: true };
      const chunks: any[] = [];

      (navigator.mediaDevices as any)
        .getUserMedia(constraints)
        // .getDisplayMedia(constraints)
        .then((stream: MediaStream) => {
          console.log("medea 불러옴");
          const mimeType = "video/webm;codecs=h264";
          // const mimeType = "video/mp4;codecs:vp9";

          const mediaRecorder = new MediaRecorder(stream, { mimeType });

          videoRef.current.stream = stream;
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          console.log("medea 시작");
          mediaRecorder.start();
          setStep("start()");

          setTimeout(() => {
            console.log("medea 종료");
            mediaRecorder.stop();
            setStep("stop()");

            stream.getTracks().forEach(track => track.stop());
          }, 10000);

          mediaRecorder.onstop = function () {
            console.log("종료됨 이벤트 핸들러");
            const blob = new Blob(chunks, { type: mimeType });
            chunks.length = 0;

            // console.warn(blob.type); // ? Here
            // setOutUrl(URL.createObjectURL(blob));

            // 녹화시간
            ysFixWebmDuration(blob.slice(), 3000, (blob: any) => {
              console.log("여긴 뭐냐?");
              console.warn(blob.type); // ? Here
              setOutUrl(URL.createObjectURL(blob));
              setStep("play()");
            });
          };

          mediaRecorder.ondataavailable = function (e: any) {
            console.log("종료됨 나머지 값 불러옴");
            chunks.push(e.data);
          };
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  }, [isStarted]);

  // medea 불러옴
  // medea 시작
  // medea 종료
  // 종료됨 나머지 값 불러옴
  // 종료됨 이벤트 핸들러
  // [fix-webm-duration] Duration section is missing
  // 여긴 뭐냐?

  return (
    <div className="App">
      {step === "ready" ? (
        <button onClick={() => setIsStarted(true)}>Record</button>
      ) : (
        <h4>{step}</h4>
      )}
      {!outUrl && (
        <video
          ref={videoRef}
          style={{ maxWidth: "100%", maxHeight: "70vh" }}
          controls
          muted
          playsInline
        />
      )}
      {outUrl && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <video
            controls
            autoPlay
            src={outUrl}
            style={{ maxWidth: "100%", maxHeight: "70vh" }}
          />
          <a href={outUrl} download>
            Download
          </a>
        </div>
      )}
    </div>
  );
}
