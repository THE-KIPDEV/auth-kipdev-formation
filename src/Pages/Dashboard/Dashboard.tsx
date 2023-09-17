import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateFirstName } from "../../Api/User";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleEditFirstName = async (formData) => {
    try {
      // Effectuez ici votre appel API avec les données du formulaire (formData)
      const response = await updateFirstName(formData.firstname, user.email);

      if (response.data && response.data.firstname) {
        user.firstname = formData.firstname;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        toast.success("Votre prénom a bien été modifié !");
      } else {
        toast.error("Une erreur est survenue !");
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Bonjour {user?.firstname}
          </h2>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Déconnexion
          </button>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(handleEditFirstName)}
          >
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-white"
              >
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="firstname"
                  autoComplete="firstname"
                  required
                  {...register("firstname", { required: true })}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Modifier mon prénom
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Pas encore de compte ?
          </p>
        </div>
      </div>
    </div>
  );
}
