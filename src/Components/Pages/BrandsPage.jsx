import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";
import { BaseUrl } from "../../BaseUrl";
import AddBtn from "../AddBtn";
import { Helmet } from "react-helmet";

const BrandsPage = ({ toast, toastOptions }) => {
  const [loading, setLoading] = useState(true);
  const [Brands, setBrands] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const getBrands = () => {
    axios({
      method: "GET",
      url: BaseUrl + "brand",
    }).then((response) => {
      setBrands(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getBrands();
  }, []);

  const addBrand = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);

    axios({
      method: "POST",
      data: formData,
      url: BaseUrl + "brand",
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        getBrands();
        setLoading(false);
        toast.success("Brand Added", toastOptions);
        document.getElementById("add").reset();
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const editBrand = (e) => {
    e.preventDefault();
    setLoading(true);
    const id = Brands[selected].id;
    let formData = new FormData(e.target);

    if (formData.get("image").size === 0) {
      formData.delete("image");
    }
    axios({
      method: "PUT",
      data: formData,
      url: BaseUrl + `brand`,
      params: {
        id: id,
      },
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        setIsUpdating(false);
        setShowEditMenu(false);
        getBrands();
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const deleteBrand = (id) => {
    setLoading(true);
    axios({
      method: "DELETE",
      url: BaseUrl + `brand`,
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
      params: {
        id: id,
      },
    })
      .then((response) => {
        getBrands();
        setLoading(false);
        toast.success("Deleted", toastOptions);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <Helmet>
        <title>Univ | Admin Panel | Brands</title>
      </Helmet>
      <Loader loading={loading} />
      <Header title="Brands" />
      {!showEditMenu && <AddBtn setShowEditMenu={setShowEditMenu} />}
      <div className="content">
        <div className="list_item">
          {Brands.map((item, index) => (
            <div className="item_card" key={index}>
              <div className="item_name">{item.name}</div>
              <div className="tools">
                <div className="item_preview">
                  <a href="" target="_blank">
                    Preview
                  </a>
                </div>
                <div className="item_edit">
                  <BiEdit
                    onClick={() => {
                      setShowEditMenu(true);
                      setIsUpdating(true);
                      setSelected(index);
                      setTimeout(() => {
                        document.getElementById("update").reset();
                      }, 800);
                    }}
                  />
                </div>
                <div className="item_delete">
                  <MdDelete
                    onClick={() => {
                      deleteBrand(item.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={showEditMenu ? "edit_menu edit_menu_active" : "edit_menu"}
          style={{
            display: !isUpdating ? "" : "none",
          }}
          id="add"
        >
          <div className="edit_menu_title">
            <p>Add Brand</p>
          </div>
          <form onSubmit={addBrand}>
            <div className="inputs">
              <label>Brand name</label>
              <input type="text" name="name" />
            </div>
            <div className="inputs">
              <label>Brand Logo</label>
              <label htmlFor="image" className="upload_btn">
                Browse
                <input type="file" id="image" name="image" />
              </label>
            </div>
            <div className="inputs">
              <label>Brand Info</label>
              <input type="text" name="details" />
            </div>
            <div className="inputs">
              <label>Brand Link</label>
              <input type="text" name="link" />
            </div>
            <div className={showEditMenu ? "phone_btn_input " : "inputs"}>
              <button type="submit">Add</button>
              {showEditMenu && (
                <button
                  onClick={() => {
                    setShowEditMenu(false);
                    setIsUpdating(false);
                  }}
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>

        {isUpdating && (
          <div
            className={
              showEditMenu ? "edit_menu edit_menu_active" : "edit_menu"
            }
          >
            <div className="edit_menu_title">
              <p>Update Brand</p>
            </div>
            <form id="update" onSubmit={editBrand}>
              <div className="inputs">
                <label>Brand name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={Brands[selected].name}
                />
              </div>
              <div className="inputs">
                <label>Brand Logo</label>
                <label htmlFor="image" className="upload_btn">
                  Browse
                  <input type="file" id="image" name="image" />
                </label>
              </div>
              <div className="inputs">
                <label>Brand Info</label>
                <input
                  type="text"
                  name="details"
                  defaultValue={Brands[selected].details}
                />
              </div>
              <div className="inputs">
                <label>Brand Link</label>
                <input
                  type="text"
                  name="link"
                  defaultValue={Brands[selected].link}
                />
              </div>
              <div className="inputs">
                <button type="submit">Update</button>
                {showEditMenu && (
                  <button
                    onClick={() => {
                      setShowEditMenu(false);
                      setIsUpdating(false);
                    }}
                  >
                    Close
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
