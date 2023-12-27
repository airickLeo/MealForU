const Test = (props) => {
    console.log(props)
    return (
        <h1>
            {typeof props.data}
        </h1>
    )
}

export default Test