
const Picture = ({title, path, styleClass}) => {

    return (
        <picture>
            <img
                className={styleClass}
                alt={title}
                src={path}
            />
        </picture>
    )
}
export default Picture;