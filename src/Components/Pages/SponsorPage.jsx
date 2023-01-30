import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";
import { BaseUrl } from "../../BaseUrl";

const SponsorPage = ({ toastOptions, toast }) => {
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const getSponsor = () => {
    axios({
      method: "GET",
      url: BaseUrl + "sponsor",
    }).then((response) => {
      setSponsors(response.data);
      setLoading(false);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getSponsor();
  }, []);

  const addSponsor = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);

    axios({
      method: "POST",
      data: formData,
      url: BaseUrl + "sponsor",
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        getSponsor();
        setLoading(false);
        toast.success("Done", toastOptions);
        document.getElementById("add").reset();
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const editsponsors = (e) => {
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
      url: BaseUrl + `sponsor`,
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
        getSponsor();
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const deleteSponsor = (id) => {
    setLoading(true);

    axios({
      method: "DELETE",
      url: BaseUrl + `sponsor`,
      headers: {
        username: "kushal",
        password: "123",
      },
      params: {
        id: id,
      },
    })
      .then((response) => {
        getSponsor();
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
      <Header title="Sponsors" />
      <div className="content">
        <div className="list_item">
          {sponsors.map((item, index) => (
            <div className="item_card" key={index}>
              <div className="item_name">{item.name}</div>
              <div className="tools">
                <div className="item_preview">
                  <a
                    href="https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png"
                    target="_blank"
                  >
                    Preview
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
          id="add"
        >
          <div className="edit_menu_title">
            <p>Add Sponsor</p>
          </div>
          <form onSubmit={addSponsor}>
            <div className="inputs">
              <label>Sponsor name</label>
              <input type="text" name="name" />
            </div>
            <div className="inputs">
              <label>Sponsor Logo</label>
              <label htmlFor="image" className="upload_btn">
                Browse
                <input type="file" id="image" name="image" />
              </label>
            </div>
            <div className="inputs">
              <label>Sponsor Info</label>
              <input type="text" name="details" />
            </div>
            <div className="inputs">
              <label>Sponsor Link</label>
              <input type="text" name="link" />
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
            <form id="update" onSubmit={editsponsors}>
              <div className="inputs">
                <label>Sponsor name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={sponsors[selected].name}
                />
              </div>
              <div className="inputs">
                <label>Sponsor Logo</label>
                <label htmlFor="image" className="upload_btn">
                  Browse
                  <input type="file" id="image" name="image" />
                </label>
              </div>
              <div className="inputs">
                <label>Sponsor Info</label>
                <input
                  type="text"
                  name="details"
                  defaultValue={sponsors[selected].details}
                />
              </div>
              <div className="inputs">
                <label>Sponsor Link</label>
                <input
                  type="text"
                  name="link"
                  defaultValue={sponsors[selected].link}
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

export default SponsorPage;
