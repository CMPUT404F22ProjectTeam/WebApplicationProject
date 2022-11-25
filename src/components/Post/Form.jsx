import "./Form.css";

const Form = ({ type, name, action, placeholder }) => {
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