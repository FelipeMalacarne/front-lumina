interface InputErrorProps {
    messages?: string[]
    className?: string
}

const InputError = ({ messages, className }: InputErrorProps) => {

    if (!messages) return null

    return (
        <>
            {messages.length > 0 && (
                <>
                    {messages.map((message, index) => (
                        <p
                            className={`${className} text-sm text-destructive`}
                            key={index}>
                            {message}
                        </p>
                    ))}
                </>
            )}
        </>
    )
}
export default InputError
