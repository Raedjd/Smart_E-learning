import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowHandle from "../ProfilUser/FollowHandle";
import { isEmpty } from "../Utilis";

const Suggestions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [friendsHint, setFriendsHint] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());

      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);
  return (
    <div class="students-feedback ">
      <div class="get-friends-container">
        <h6 style={{ color: "#1089ff" }}>Suggestions</h6>
        {isLoading ? (
          <div class="icon">
            <i class="spinner-grow text-primary"></i>
          </div>
        ) : (
          <ul>
            {friendsHint &&
              friendsHint.map((user) => {
                for (let i = 0; i < usersData.length; i++) {
                  if (user === usersData[i]._id) {
                    return (
                      <li className="user-hint" key={user}>
                        <img src={usersData[i].avatar} width="30" height="30" />
                        {usersData[i].username}
                        <FollowHandle
                          idToFollow={usersData[i]._id}
                          type={"suggestion"}
                        />
                      </li>
                    );
                  }
                }
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
