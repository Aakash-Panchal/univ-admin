import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";
import { BaseUrl } from "../../BaseUrl";
import AddBtn from "../AddBtn";
import { Helmet } from "react-helmet";

const ClientsPage = ({ toastOptions, toast }) => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const [phoneMenu, setPhoneMenu] = useState(false);

  const getClients = () => {
    axios({
      method: "GET",
      url: BaseUrl + "client",
    }).then((response) => {
      setClients(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  const addClient = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);

    axios({
      method: "POST",
      data: formData,
      url: BaseUrl + "client",
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        getClients();
        setLoading(false);
        toast.success("client Added", toastOptions);
        document.getElementById("add").reset();
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const editclients = (e) => {
    e.preventDefault();
    setLoading(true);
    const id = clients[selected].id;
    let formData = new FormData(e.target);

    if (formData.get("image").size === 0) {
      formData.delete("image");
    }

    axios({
      method: "PUT",
      data: formData,
      url: BaseUrl + `client`,
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
        getClients();
        setLoading(false);
        toast.success("Client Updated", toastOptions);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  const deleteClient = (id) => {
    setLoading(true);

    axios({
      method: "DELETE",
      url: BaseUrl + `client`,
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
      params: {
        id: id,
      },
    })
      .then((response) => {
        getClients();
        setLoading(false);
        toast.success("Client Deleted", toastOptions);
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
      <Helmet>
        <title>Univ | Admin Panel | Clients</title>
      </Helmet>
      <Loader loading={loading} />
      <Header title="clients" />
      <AddBtn showPhoneMenu={showPhoneMenu} />
      <div className="content">
        <div className="list_item">
          {clients.map((item, index) => (
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
                      deleteClient(item.id);
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
          id="add"
        >
          <div className="edit_menu_title">
            <p>Add Client</p>
          </div>
          <form onSubmit={addClient}>
            <div className="inputs">
              <label>Client name</label>
              <input type="text" name="name" />
            </div>
            <div className="inputs">
              <label>Client Logo</label>
              <label htmlFor="image" className="upload_btn">
                Browse
                <input type="file" id="image" name="image" />
              </label>
            </div>
            <div className="inputs">
              <label>Client Info</label>
              <input type="text" name="details" />
            </div>
            <div className="inputs">
              <label>Client Link</label>
              <input type="text" name="link" />
            </div>
            <div className={showEditMenu ? "phone_btn_input " : "inputs"}>
              <button type="submit">Add</button>
              {phoneMenu && <button onClick={ShowEditMenu}>Close</button>}
            </div>
          </form>
        </div>

        {isUpdating && (
          <div
            className={phoneMenu ? "edit_menu edit_menu_active" : "edit_menu"}
          >
            <div className="edit_menu_title">
              <p>Update Client</p>
            </div>
            <form id="update" onSubmit={editclients}>
              <div className="inputs">
                <label>Client name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={clients[selected].name}
                />
              </div>
              <div className="inputs">
                <label>Client Logo</label>
                <label htmlFor="image" className="upload_btn">
                  Browse
                  <input type="file" id="image" name="image" />
                </label>
              </div>
              <div className="inputs">
                <label>Client Info</label>
                <input
                  type="text"
                  name="details"
                  defaultValue={clients[selected].details}
                />
              </div>
              <div className="inputs">
                <label>Client Link</label>
                <input
                  type="text"
                  name="link"
                  defaultValue={clients[selected].link}
                />
              </div>
              <div className="inputs">
                <button type="submit">Update</button>
                {phoneMenu && <button onClick={ShowEditMenu}>Close</button>}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
