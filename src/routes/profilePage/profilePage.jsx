import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";



function ProfilePage() {
  const data = useLoaderData();
  const {updateUser, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update"><button>Update Profile</button></Link>

          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQUDBAYCCAf/xAA+EAACAQICBwYDBQUJAQAAAAAAAQIDEQQFBhIhMVGU0RMWQVVhcSIykRQjgaHBQlJic/FERXKCkqKx4fAV/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAMC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQQ92wJWQEgAAQwaeKzGjh7xv2k1+zHw92BuIiU4xV5SUV6uxz+IzTE1dkZKnH+Hf8AU05SlN3m3J8W7gdNLHYWO/EU/wAJXPKzDCP+0Q+pzQA6qFejP5KsJe0kZTkDNRxVei/u6skuG9AdSCow2c7o4mH+aPQsqNSNVa9OalF+KYGUAAACN4AEgAAAB5nKMIuUmklvbJbsrnP5njniZdnTbVJf7gPePzOdVunQbhDc5eMuiK4AAZKFCpXlq0oOTMuAwksXV1d0F80joqNCnQgoU4pRX5gU8MlqtfHVhH0W09PJJ+FeP+kugBztfK8TSV0lUX8G/wChpbt+w64rM4wevT7enH44/NbxQFIZcPiKuGnrUZW4rwfuYgB0mBxsMVD92ot8ehtnJU5ypzU4SaktzR0OX4qOKhrbqi2SiBtokAAAADdgnchq6PM5KlTlOXyxTbArc6xerD7PB7ZK8vbgUp7r1XWqzqS3ydzwAZCdySLAdDk1PUwal4zd/wBDfNfAK2Cofy0zYAEJp7iSErASQ9pIA5fHUlQxdWmtyd17PaYDezpWxzfGCZogDNhMRLDV41I+GxrijCAOtpzjUhGcXeMldM9FVkeI16c6EntjtXsWoAAACvzqr2eD1fGpJR/DxLAps/k9ejD0bAqQAAG8ADqsLB08PSpy3xgk/oZTxSlr0oS4xTPYAAAAABQ55TlHFRqP5ZRsren9SuLTPpXr048I3+v9CrAEXuyRsA2ctq9ljab8JPVf4nTHIxeq1Jb07nWQlrRT4q4HoAAQUeet/a4fy/1ZelJn6tWpS4xt+YFWAAAAAv8AKcXCph6dFyXaRWrq8UiwOZyyap46lJ7m7fVWOmAERd7kgAeKtSNKDnOSjFb2z2aGczSwTj4zkl+oFRmNdYjFznHbHdH2Rqp3ZIAAAAdVh9tCl/gX/ByvsdbSjq04x4JICbAkACsz2nrYeFT9yX5P/wAizMWJpKvQqU3+1Fr2A5R3t6hep6lFxk4yVmnZkAAAATad1vR1eHk50ISe9xTZz+WYZYnFKM1eEVrSR0cUopJbEtyAkAAQ3Yo88nKVeEH8sY3S9WXpoZrhI1sPKpGP3sFdNeK4Ac+B7AAAAM2Dp9riqUOMlf2OpKXIqN6k67WyK1V7l0AAAAAAUWdYbUqKvD5Jv4vRladZWpwq0pU6ivGSszmsThalCv2bTlfbFpfMgMB6pU5VaihTV5N7Eb2FyqrVadf7qH5voXVGhTox1acFHZbYt4GHL8GsJTa1tacn8T/Q2wE7gAAAIe4kAc/mOXvDNzg702+HymgddYr8bldOt8VG1OfivBgUJ6pwlUnGEFeUnZHuvhq2Hv2sGlx8PqW+U4Lso9tVj9418Kf7KA3cLRjh6EacfDe+LMlviuegAAAAEN2VwndAGroKKRIAAEASQlYkAACE09wEgAAAQmm7IBa+8mwAAAAAAAe0FN3r0e87y/mI9R3r0e87y/mI9QLkFMtK9Hn/AH3l/MR6k96tHvO8v5iPUC3JKfvVo953l/MR6jvVo953l/MR6gXAKbvXo953l/MR6haV6Ped5fzEeoFyQkluKjvVo953l/MR6jvVo953l/MR6gXAKfvVo953l/MR6kd6tHvO8v5iPUC4Cik7op+9Wj3neX8xHqT3q0e87y/mI9QLgFP3q0e87y/mI9SO9ej3neX8xHqBcgpu9ej3neX8xHqO9ej3neX8xHqBcgpu9ej3neX8xHqAPnnQ3BYXHZrOGMoRrU4UJ1FCTaWstqvZ7f8As7V6I5DGE6H2BNQldTdapr7tzettQBVhp0NG8mnjcMv/AJ8FFQw8nHtJtSc6qi73lt2HAY+lTo47E0qUFGnTrThFXb2KTS2va9wAGCy4IWXBEACbLghZcEAAsuCFlwRAAmy4IWXBEACbLghZcEQAJsuCNnAxpSlNVaMai1brWclb6NAAZ5woKUUsNTS23WtPbu9TFKNFpr7PTWzY9aWzd6gAalkAAP/Z"} 
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add"> <button>Create New Post</button></Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
       
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  
);
}

export default ProfilePage;
