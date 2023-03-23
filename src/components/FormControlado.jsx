import useForm from "../hooks/useForm";
import usePreLoad from "../hooks/usePreload";
import PuffLoader from "react-spinners/ClipLoader";
import "./form.css";

const FormControlado = () => {
  const { load } = usePreLoad();
  const initialData = {
    nombre: "",
    correo: "",
    mensaje: "",
  };

  const onValidate = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;

    if (!form.nombre.trim()) {
      errors.nombre = "is require";
    } else if (!regexName.test(form.nombre)) {
      errors.nombre = "only letters and spaces";
    }

    if (!form.correo.trim()) {
      errors.correo = "is require";
    } else if (!regexEmail.test(form.correo)) {
      errors.correo = "invalid email";
    }

    if (!form.mensaje.trim()) {
      errors.mensaje = "is require";
    } else if (!regexComments.test(form.mensaje)) {
      errors.mensaje = "max 255 characters";
    }

    return errors;
  };

  const { form, errors, loading, message, handleChange, handleSubmit } =
    useForm(initialData, onValidate);

  return (
    <div className="mockup-phone container border-gray-500">
      <div className="camera"></div>
      <div className="display container">
        <div className="artboard-demo container-two  phone-1">
          {load ? (
            <>
              <PuffLoader color="#7DD3FC" size={60} speedMultiplier={1} />
              <p className="mt-2">loading</p>
            </>
          ) : message ? (
            <div className="flex justify-center items-center gap-2">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-info"
                />
              </label>
              <span className="label-text">successful message</span>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-sky-300 mb-4">Logo</h1>
              <form
                className="flex flex-col gap-2 mx-10"
                onSubmit={handleSubmit}
              >
                <label className="label">
                  <span className="label-text text-base">
                    What is your name?
                  </span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="text"
                  placeholder="nombre"
                  className="input input-bordered input-info w-full max-w-xs field"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <p className="text-start  text-sky-300 text-sm">
                    {errors.nombre}
                  </p>
                )}

                <label className="label">
                  <span className="label-text text-base">
                    What is your email?
                  </span>
                </label>
                <input
                  type="text"
                  name="correo"
                  id="correo"
                  placeholder="example@gmail.com"
                  className="input input-bordered input-info w-full max-w-xs field"
                  value={form.correo}
                  onChange={handleChange}
                />
                {errors.correo && (
                  <p className="text-start text-sky-300 text-sm">
                    {errors.correo}
                  </p>
                )}

                <label className="label">
                  <p className="label-text text-base">message</p>
                </label>
                <textarea
                  type="text"
                  name="mensaje"
                  id="mensaje"
                  placeholder="message"
                  className="textarea textarea-info field"
                  value={form.mensaje}
                  onChange={handleChange}
                />
                {errors.mensaje && (
                  <p className="text-start  text-sky-300 text-sm">
                    {errors.mensaje}
                  </p>
                )}

                <button
                  className="btn btn-block btn-outline btn-info mt-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormControlado;
