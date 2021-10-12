import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getaCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    category: "",
    loading: false,
    error: "",
    updatedCategory: "",
    getaRedirect: false,
    formData: "",
  });

  const { category, loading, error, updatedCategory, getaRedirect, formData } =
    values;

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          category: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  // console.log(match.params.categoryId);
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateCategory(user._id, match.params.categoryId, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
          console.log(formData);
        } else {
          setValues({
            ...values,
            category: "",
            loading: true,
            getaRedirect: true,
            updatedProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const performRedirect = () => {
    if (getaRedirect) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const loadingMessage = () => {
    return loading && <div className="alert alert-info mt-3">Loading....</div>;
  };
  const errorMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>Not Updated successfully</h4>
    </div>
  );
  const createProductForm = () => (
    <form>
      <span>Update Category</span>
      <div className="form-group">
        <input
          onChange={handleChange("category")}
          name="category"
          className="form-control"
          placeholder="Name"
          value={category}
          required
          autoFocus
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Update a category here!"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {performRedirect()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
