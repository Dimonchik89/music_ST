import Drawer from '@mui/material/Drawer';
import SlideButtons from './SlideButtons';
import SlideLinks from './SlideLinks';

const SlideMenu = ({show, toggleMobileMenu}) => {

    return (
        <Drawer
            PaperProps={{
                sx: {
                    position: 'absolute',
                    top: "66px",
                    width: "100%",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: '62px',
                    padding: '2.4rem 1.6rem 0'
                }
            }}
            anchor={"right"}
            open={show}
            onClose={() => toggleMobileMenu()}
        >
            <SlideButtons/>
            <SlideLinks toggleMobileMenu={toggleMobileMenu}/>
        </Drawer>
    )
}
export default SlideMenu