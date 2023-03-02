import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BaseUrl } from "../../BaseUrl";
import AddBtn from "../AddBtn";
import Header from "../Header";
import Loader from "../Loader";

const ExpertisePage = ({ toast, toastOptions }) => {
  const [loading, setLoading] = useState(true);
  const [Expertise, setExpertise] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);

  const admin = {
    username: localStorage.getItem("Univ-Admin-username"),
    password: localStorage.getItem("Univ-Admin-password"),
  };

  const getExpertise = () => {
    axios({
      method: "GET",
      url: BaseUrl + "expertise",
    }).then((response) => {
      setExpertise(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getExpertise();
  }, []);

  const addExpertise = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);

    axios({
      method: "POST",
      data: formData,
      url: BaseUrl + "expertise",
      headers: admin,
    })
      .then((response) => {
        getExpertise();
        setLoading(false);
        toast.success("Expertise Added", toastOptions);
        document.getElementById("add").reset();
      })
      .catch((response) => {
        setLoading(false);
        toast.error("There was an error", toastOptions);
      });
  };

  const editExpertise = () => {
    e.preventDefault();
    setLoading(true);
    const id = sponsors[selected].id;
    let formData = new FormData(e.target);
    if (formData.get("image").size === 0) {
      formData.delete("image");
    }
    axios({
      method: "PUT",
      data: formData,
      url: BaseUrl + `expertise`,
      params: {
        id: id,
      },
      headers: admin,
    })
      .then((response) => {
        setIsUpdating(false);
        showPhoneMenu();
        getExpertise();
        setLoading(false);
        toast.success("Expertise Updated", toastOptions);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const deleteExpertise = (id) => {
    setLoading(true);

    axios({
      method: "DELETE",
      url: BaseUrl + `expertise`,
      headers: admin,
      params: {
        id: id,
      },
    })
      .then((response) => {
        getExpertise();
        setLoading(false);
        toast.success("Expertise Deleted", toastOptions);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const showPhoneMenu = () => {
    phoneMenu ? setPhoneMenu(false) : setPhoneMenu(true);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Univ | Admin Panel | Expertise</title>
      </Helmet>
      <Loader loading={loading} />
      <Header title="Expertise" />
      {!isUpdating && <AddBtn showPhoneMenu={showPhoneMenu} />}
      <div className="content">
        <div className="list_item">
          {Expertise.map((item, index) => (
            <div className="item_card" key={index}>
              <div className="item_name">{item.name}</div>
              <div className="tools">
                <div className="item_preview">
                  <a href={item.bg.name} target="_blank">
                    Preview
                  </a>
                </div>
                <div className="item_edit">
                  <BiEdit
                    onClick={() => {
                      showPhoneMenu();
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
                      deleteExpertise(item.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={phoneMenu ? "edit_menu edit_menu_active" : "edit_menu"}
          style={{
            display: !isUpdating ? "" : "none",
          }}
        >
          <div className="edit_menu_title">
            <p>Add Expertise</p>
          </div>
          <form onSubmit={addExpertise} id="add">
            <div className="inputs">
              <label>Expertise name</label>
              <input required type="text" name="name" />
            </div>
            <div className="inputs">
              <label>Expertise Background</label>
              <label htmlFor="image" className="upload_btn">
                Browse
                <input required type="file" id="image" name="bg" />
              </label>
            </div>
            <div className="inputs">
              <label>Expertise Info</label>
              <input required type="text" name="info" />
            </div>
            <div className="inputs">
              <label>Expertise Url* (Must be uniqe)</label>
              <input required type="text" name="url" />
            </div>
            <div className="inputs">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>

        {isUpdating && (
          <div
            className={phoneMenu ? "edit_menu edit_menu_active" : "edit_menu"}
          >
            <div className="edit_menu_title">
              <p>Update Expertise</p>
            </div>
            <form id="update" onSubmit={editExpertise}>
              <div className="inputs">
                <label>Expertise name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={Expertise[selected].name}
                />
              </div>
              <div className="inputs">
                <label>Expertise Background</label>
                <label htmlFor="image" className="upload_btn">
                  Browse
                  <input type="file" id="image" name="bg" />
                </label>
              </div>
              <div className="inputs">
                <label>Expertise Info</label>
                <input
                  type="text"
                  name="info"
                  defaultValue={Expertise[selected].details}
                />
              </div>
              <div className="inputs">
                <label>Expertise Url* (Must be uniqe)</label>
                <input
                  type="text"
                  name="url"
                  defaultValue={Expertise[selected].link}
                />
              </div>
              <div className="inputs">
                <button type="submit">Update</button>
              </div>
            </form>
            {isUpdating && (
              <button
                className="phoneBtn"
                onClick={() => {
                  setIsUpdating(false);
                  showPhoneMenu();
                }}
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertisePage;
