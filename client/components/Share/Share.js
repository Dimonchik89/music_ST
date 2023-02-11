import { Box } from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from "react-share";
import ShareItem from "./ShareItem";

import share from "../../styles/share.module.scss";

const shareLink = [
    {
        iconPath: "../../static/icon/facebook.svg",
        title: "Facebook",
        Component: FacebookShareButton
    },
    {
        iconPath: "../../static/icon/twitter.svg",
        title: "Twitter",
        Component: TwitterShareButton
    },
    {
        iconPath: "../../static/icon/telegram.svg",
        title: "Telegram",
        Component: TelegramShareButton
    },
    {
        iconPath: "../../static/icon/whatsapp.svg",
        title: "WhatsApp",
        Component: WhatsappShareButton
    },
]

const Share = ({musicId, changeButton, addedStyle = null}) => {

    const content = shareLink?.map((item, i) => <ShareItem key={i} changeButton={changeButton} iconPath={item.iconPath} title={item.title} Component={item.Component} musicId={musicId}/>)

    return (
        <Box className={share.share} style={addedStyle}>
            <Box style={{ textAlign: "start"}}>
                {content}
            </Box>
        </Box>
    )
}
export default Share;