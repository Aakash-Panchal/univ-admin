import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";
import Loader from "../Loader";
import AddBtn from "../AddBtn";

const Teams = ({ toastOptions, toast }) => {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);

  const admin = {
    username: localStorage.getItem("Univ-Admin-username"),
    password: localStorage.getItem("Univ-Admin-password"),
  };

  const getTeams = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: BaseUrl + "team",
    }).then((response) => {
      setTeam(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const addMember = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    axios({
      method: "POST",
      data: formData,
      url: BaseUrl + "team",
      headers: admin,
    })
      .then((response) => {
        getTeams();
        toast.success("Done", toastOptions);
        document.getElementById("add").reset();
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
        toast.success(response.data, toastOptions);
      });
  };

  const editMember = (e) => {
    e.preventDefault();
    const id = team[selected].id;
    let formData = new FormData(e.target);
    if (formData.get("image").size === 0) {
      formData.delete("image");
    }
    axios({
      method: "PUT",
      data: formData,
      url: BaseUrl + "team",
      params: {
        id: id,
      },
      headers: admin,
    })
      .then((response) => {
        toast.success("Done", toastOptions);
        setIsUpdating(false);
        getTeams();
      })
      .catch((response) => {
        toast.error("There was an error", toastOptions);
      });
  };

  const deleteMember = (id) => {
    setLoading(true);
    axios({
      method: "DELETE",
      url: BaseUrl + `team`,
      headers: admin,
      params: {
        id: id,
      },
    })
      .then((response) => {
        getTeams();
        setLoading(false);
        toast.success("Deleted", toastOptions);
      })
      .catch((response) => {
        setLoading(false);
      });
  };
  const ShowEditMenu = () => {
    showEditMenu ? setShowEditMenu(false) : setShowEditMenu(true);
  };

  const showPhoneMenu = () => {
    phoneMenu ? setPhoneMenu(false) : setPhoneMenu(true);
  };

  return (
    <div className="container">
      <Loader loading={loading} />
      <Header title="Team" />
      <AddBtn setShowEditMenu={setShowEditMenu} />
      <div className="content">
        <div className="list_item">
          {team.map((item, index) => (
            <div className="item_card" key={index}>
              <div className="item_name">{item.name}</div>
              <div className="tools">
                <div className="item_preview">
                  <a
                    href="https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png"
                    target="_blank"
                  >
                    Profile Image
                  </a>
                </div>
                <div className="item_edit">
                  <BiEdit
                    onClick={() => {
                      showPhoneMenu();
                      ShowEditMenu();
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
                      deleteMember(item.id);
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
        >
          <div className="edit_menu_title">
            <p>Add Member</p>
          </div>
          <form onSubmit={addMember}>
            <div className="inputs">
              <label>Name</label>
              <input name="name" type="text" />
            </div>
            <div className="inputs">
              <label>Role</label>
              <input name="role" type="text" />
            </div>
            <div className="inputs">
              <label>Profile image</label>
              <label htmlFor="image" className="upload_btn">
                Browse
                <input type="file" id="image" name="image" />
              </label>
            </div>
            <div className="inputs">
              <label>Url* (Must be uniqe)</label>
              <input name="url" type="text" />
            </div>
            <div className="inputs">
              <label>Member info</label>
              <textarea name="info" type="text" />
            </div>
            <div className={showEditMenu ? "phone_btn_input " : "inputs"}>
              <button type="submit">Add</button>
              {showEditMenu && (
                <div className="phoneBtn" onClick={ShowEditMenu}>
                  Close
                </div>
              )}
            </div>
          </form>
        </div>

        {isUpdating && (
          <div
            className={phoneMenu ? "edit_menu edit_menu_active" : "edit_menu"}
          >
            <div className="edit_menu_title">
              <p>Update Member</p>
            </div>
            <form id="update" onSubmit={editMember}>
              <div className="inputs">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={team[selected].name}
                />
              </div>
              <div className="inputs">
                <label>Role</label>
                <input
                  name="role"
                  type="text"
                  defaultValue={team[selected].role}
                />
              </div>
              <div className="inputs">
                <label>Profile image</label>
                <label htmlFor="image" className="upload_btn">
                  Browse
                  <input type="file" id="image" name="image" />
                </label>
              </div>
              <div className="inputs">
                <label>Url* (Must be uniqe)</label>
                <input
                  name="url"
                  type="text"
                  defaultValue={team[selected].url}
                />
              </div>
              <div className="inputs">
                <label>Member info</label>
                <textarea
                  name="info"
                  type="text"
                  defaultValue={team[selected].info}
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
                  ShowEditMenu();
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

export default Teams;
