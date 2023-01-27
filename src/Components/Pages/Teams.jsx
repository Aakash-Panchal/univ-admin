import React from "react";
import Header from "../Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Teams = () => {
  const Data = [
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "two",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "two",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "two",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
    {
      name: "one",
      link: "https://res.cloudinary.com/dzsocqtuc/image/upload/v1673344719/logos/Screenshot_from_2023-01-10_15-22-15-removebg-preview_rtctar.png",
    },
  ];

  const HandelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <Header title="Team" />
      <div className="content">
        <div className="list_item">
          {Data.map((item, index) => (
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
                  <BiEdit />
                </div>
                <div className="item_delete">
                  <MdDelete />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="edit_menu">
          <div className="edit_menu_title">
            <p>Add Member</p>
          </div>
          <form onSubmit={HandelSubmit}>
            <div className="inputs">
              <label>Name</label>
              <input type="text" />
            </div>
            <div className="inputs">
              <label>Role</label>
              <input type="text" />
            </div>
            <div className="inputs">
              <label>Profile image</label>
              <input type="file" />
            </div>
            <div className="inputs">
              <label>Url* (Must be uniqe)</label>
              <input type="text" />
            </div>
            <div className="inputs">
              <label>Member info</label>
              <textarea type="text" />
            </div>
            <div className="inputs">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Teams;
