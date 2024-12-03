import { io } from 'socket.io-client';
import React from "react"
import { hidePluginWindow } from "./utils"
import { v4 as uuid } from "uuid"


let videoTransferFileName: string | undefined
let mediaRecorder: MediaRecorder | undefined
let userId: string
let isRecording = false;

const socket = io(import.meta.env.VITE_SOCKET_URL as string)


export const StartRecording = (onSources: {
    screen: string
    audio: string
    id: string
}) => {
    hidePluginWindow(true);
    videoTransferFileName = `${uuid()}-${onSources?.id.slice(0, 8)}.webm`;
    isRecording = true;  // Set flag to start recording
    mediaRecorder?.start(1000);
};

export const onStopRecording = () => {
    isRecording = false;  // Set flag to stop recording
    mediaRecorder?.stop();
};

const StopRecording = () => {
    hidePluginWindow(false);
    socket.emit('process-video', {
        filename: videoTransferFileName,
        userId,
    });
};

export const onDataAvailable = (e: BlobEvent) => {
    // Emit chunks only if recording is active
    if (isRecording) {
        socket.emit('video-chunks', {
            chunks: e.data,
            filename: videoTransferFileName
        });
    }
};

export const selectSources = async (onSources: {
    screen: string
    audio: string
    id: string
    preset: "HD" | "SD"
}, videoElement: React.RefObject<HTMLVideoElement>) => {
    if (onSources && onSources.screen && onSources.audio && onSources.id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const constraints: any = {
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: "desktop",
                    chromeMediaSourceId: onSources?.screen,
                    minWidth: onSources?.preset === "HD"? 1920 : 1280,
                    maxWidth: onSources?.preset === "HD"? 1920 : 1280,
                    minHeight: onSources?.preset === "HD"? 1080 : 720,
                    maxHeight: onSources?.preset === "HD"? 1080 : 720,
                    frameRate: 30
                }
            }
        }
        userId = onSources.id

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const audioStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: onSources?.audio ? { deviceId: { exact: onSources.audio } } : false,
        })
        if (videoElement && videoElement.current) {
            videoElement.current.srcObject = stream
            await videoElement.current.play()
        }

        const combinedStream = new MediaStream([
            ...stream.getTracks(),
            ...audioStream.getTracks()
        ])

        mediaRecorder = new MediaRecorder(combinedStream, {
            mimeType: 'video/webm; codecs=vp9'
        })

        mediaRecorder.ondataavailable = onDataAvailable;
        mediaRecorder.stop = StopRecording
    }
}