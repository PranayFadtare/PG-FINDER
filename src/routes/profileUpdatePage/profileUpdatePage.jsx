import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAMFBMVEXk5ueutLenrrHg4+Tn6eqqsLSxt7rq7O26v8LGyszd4OHR1NbY29zBxsjV2Nq0urz6zFdmAAAD+0lEQVR4nO2c2XajMAxAWWTjDfj/vx0TkjZJW2JLRjJnfF+mp0/3aITkRW7XNRqNRqPRaDQajUajIQyAtEEa0zS5sETcOE01O0M3Om/6YRhUJP6jZ++2X1cIdMGuveqfidLGhvrSAiZv9KvqQ1ibUFtKLL+qPozXUJEuBHPguukOs6vFF/xRYO++2leiaz6p7sw16Lr1Y2Dv4TXy2RDWNNeNVVgXXLprRIu2CnCJWfCl6yRlM9Jgx4xyuonV4EV3EnKd5sw82BisTOpCGPJlIzJdeMxO2h0jIQsWJ9srL2AbkLIR/roAM1pW8X9oDveJyQR3QpTab7iDO1JkuTsauiDsqIU3uB+2Np9sZ05XCJoU27h05LT1pNDG1ULg1MWsZ55hLbkjMRHipodx4ThSWsMeXMbYLnRbvsQFS0zbCN9hCGrT8AbfZ0ZbJOzwndxMyF3DM4bPli7bbJstv+21vrJrVbBLdYdrdd7OX2lVQztM2G0vtRrXnMe4+GOlOzOjLX0XufDJxh06NbashzUjsT+wnn6QT5aYL33zbvXeWZmvza51IkprEOw3kkAILmexvXOpWxJ8P1NWQBYccrEgczENyHUj8yn+l+6VbqW3/puvK3bjj7l+WAWnKbIv/TXrfcMP3SUrF5T00NKSkQxafpwx9KnhrWH2MnaJJF0lOa70BNiEbNBidfadjxOt/WAqyIIH0Pmj7FW9r2t6HA7SYfUVTo53ftZKvY+5r3NlcX0AnVvs2u8PCLYnBMrYxdXpeif+pwfvrfc+jPUlwCtwY9rYf5QW+oPoGDMhLDGodif+tIQY4E1c2u4ZgDH4edW/VgW9xuytIym2pzmLNbcv66Dexi8u1oYg+sUBOG/Nj6r1p3K/Gcs85oKp82v+rldr67hf7cQE8OuAPHEeeutGPmEYt66FU72hemOZdhFxRfD+jAyDnh3D7ne05NunO8qcXCPA2QJh/WYO5/lCZ1NfECWi9HzWKh2WoqYPTtkBgTOlEvYVpYsvgI+2BnRM2fIL1PuxD+iSp6TgT3Xtb8POpXxLDE981C30DBHIo8FpukUOySD5lSbZl36dmnrKVYKBqssX2Rs0Xc7IbpCSAcaia5gECMkA2Nd5FPB9gva8BQmykHE0hZ8ojTpCJ88lYXUx85hAn1DDgvnSzl11HYG4Ajx92fU3iNdnYnmw6WZO4k0i9eCbvMylPdKkk7W1JDwtLkPWYED+X3EoTUYVk+liL2RcCp+8w00iveYG8dBmPPOsIBHiSjfVdpLsDA+G5B37OQdemSSmgtRS8Y3EZ0eoEbryJDaIEi+cCpB6diPeyG4knjtiJ1VLk9R8Ydn+lGIFJBYFN9ZBkmzjv+QfEsU4auaNFxoAAAAASUVORK5CYII="} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "pranay111",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;