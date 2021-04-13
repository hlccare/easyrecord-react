type Props = {
    name: string
}
const Image: React.FunctionComponent<Props> = (props) => {
    return (
        <img src={require(`../images/${props.name}.png`).default} alt='图片' />
    )
}
export { Image }