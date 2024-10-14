"use client";

import { useUser } from "@clerk/nextjs";

function Header() {
  const data = useUser();
  console.log(data?.user?.username);

  const username = data?.user?.username;
  const getData = async () => {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`
    );
    const result = await res.json();
    console.log(result);
  };

  getData();
  return (
    <div>
      <h1>Hello ,{username}</h1>
    </div>
  );
}

export default Header;
