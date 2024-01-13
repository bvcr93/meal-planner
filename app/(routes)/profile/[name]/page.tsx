import React from "react";
interface ProfileProps {
  params: {
    name: string;
  };
}
export default async function ProfilePage({
  params,
}: {
  params: { name: string };
}) {
  return <div className="min-h-screen">{decodeURIComponent(params.name)}</div>;
}
