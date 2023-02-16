
export const generateMusicLink = async (serverLink) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/music/download?filename=${serverLink}`)
    const blob = await response.blob()
    const musicUrl = window.URL.createObjectURL(blob)
    return musicUrl;
}