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
  const [showEditMenu, setShowEditMenu] = useState(false);

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
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        getExpertise();
        setLoading(false);
        toast.success("expertise Added", toastOptions);
        document.getElementById("add").reset();
      })
      .catch((response) => {
        setLoading(false);
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
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        setIsUpdating(false);
        setShowEditMenu(false);
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
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
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

  return (
    <div className="container">
      <Helmet>
        <title>Univ | Admin Panel | Expertise</title>
      </Helmet>
      <Loader loading={loading} />
      <Header title="Expertise" />
      {!showEditMenu && <AddBtn setShowEditMenu={setShowEditMenu} />}
      <div className="content">
        <div className="list_item">
          {Expertise.map((item, index) => (
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
                      deleteExpertise(item.id);
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
            <p>Add Expertise</p>
          </div>
          <form onSubmit={addExpertise}>
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

export default ExpertisePage;
