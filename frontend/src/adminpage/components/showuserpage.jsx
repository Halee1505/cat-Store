import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const host = "http://localhost:1505";
export default function ShowUserPage() {
  const [users, setUsers] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false);
  useEffect(() => {
    axios.get(host + "/user").then((res) => {
      setUsers(res.data);
    });
  }, [checkDelete]);

  function DeleteUser(user) {
    // eslint-disable-next-line no-restricted-globals
    const cf = confirm("Are you sure to delete this user?");
    if (cf) {
      axios.delete(host + "/user/" + user.id).then((res) => {
        setCheckDelete(!checkDelete);
      });
    }
  }

  return (
    <table className="table bg-white rounded">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên khách hàng</th>
          <th scope="col">Email</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Xóa tài khoản</th>
          <th scope="col" style={{ width: "12vw" }}>
            Chi tiết
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length !== 0 ? (
          users.map((user, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name !== null ? user.name : "Chưa cập nhật"}</td>
                <td>
                  <a href={user.email}>{user.email}</a>
                </td>
                <td>{user.phone !== null ? user.phone : "Chưa cập nhật"}</td>
                <td>
                  <div
                    className="badge badge-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      DeleteUser(user);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>
                  <Link
                    to={`/admin/user?id=${user.id}`}
                    className="badge badge-success"
                    style={{ cursor: "pointer" }}
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </tbody>
    </table>
  );
}
