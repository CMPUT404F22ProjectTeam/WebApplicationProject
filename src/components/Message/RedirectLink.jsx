import "./RedirectLink.css";

const RedirectLink = ({ href, message, link }) => {
    return (
        <form>
            <p>
                {message}
                <a href={href}>
                    {link}
                </a>
            </p>
        </form>
    )
}
export default RedirectLink