export interface FullScreenMessageProps {
    message: string;
    messageClassName?: string;
}

export function FullScreenMessage (props: FullScreenMessageProps) {
    const {message, messageClassName} = props;
    return (
        <div className="flex h-screen w-screen bg-gray-900 text-2xl">
            <div className={`m-auto ${messageClassName || ''}`}>
                {message}
            </div>
        </div>
    )
}