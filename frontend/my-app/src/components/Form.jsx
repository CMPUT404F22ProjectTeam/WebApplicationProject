import "./Form.css";

const Form = ({ type, name, action, placeholder, value }) => {
    return (
        <input
            type={type}
            className="input"
            name={name}
            onChange={action}
            placeholder={placeholder}
        />
    )
}
export default Form