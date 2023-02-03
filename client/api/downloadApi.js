import useHttp from "../hooks/useHttp";

export const downloadMusic = async ({e, music}) => {
    const {downloadFile} = useHttp()
    e.stopPropagation()
    const response = await downloadFile(music.audio)
    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = music.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}