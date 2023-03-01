import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";
import Loader from "../Loader";

const Teams = ({ toastOptions, toast, admin }) => {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

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

  const editMember = (e, id) => {
    e.preventDefault();
    let formData = new FormData(e.target);

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
        setIsUpdating(false);
        getTeams();
      })
      .catch((response) => {});
  };

  const deleteSponsor = (id) => {
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
        console.log(response);
      });
  };

  const ShowEditMenu = () => {
    showEditMenu ? setShowEditMenu(false) : setShowEditMenu(true);
  };

  return (
    <div className="container">
      <Loader loading={loading} />
      <Header title="Team" />
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
                      deleteSponsor(item.id);
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
              {showEditMenu && <button onClick={ShowEditMenu}>Close</button>}
            </div>
          </form>
        </div>

        {isUpdating && (
          <div className="edit_menu">
            <div className="edit_menu_title">
              <p>Update Sponsor</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
