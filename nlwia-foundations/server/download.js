import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando download do vídeo: " + videoId)

    ytdl(videoURL, {quality:"lowestaudio", filter:"audioonly"})
    .on("info",
    (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if(seconds > 60){
            throw new Error("Vídeo muito longo (+60 segundos)")
        }
    })
    .on("end", () => {
        console.log("Download Finalizado.")
    })
    .on("error", (error) => {
        console.log("Erro no Download:", error)
    })
    .pipe(fs.createWriteStream('./tmp/audio.mp4'))
}