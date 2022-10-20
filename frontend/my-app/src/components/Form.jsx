import "./Form.css";

const Form = ({ type, name, action, placeholder, value }) => {
    return (
        <input
            type={type}
            className="form"
            name={name}
            onChange={action}
            placeholder={placeholder}
            value={value}
        />
    )
}
export default Form