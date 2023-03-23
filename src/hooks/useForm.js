import { useState } from "react";

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState({});
  const [message, setMessage] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = onValidate(form);
    setErros(err);

    if (Object.keys(err).length === 0) {
      setLoading(true);
      fetch("https://formsubmit.co/ajax/juniorjavierduquevalera@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.success === "true" && setForm(initialData);
          setLoading(false);
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return { form, errors, loading, message, handleChange, handleSubmit };
};

export default useForm;
