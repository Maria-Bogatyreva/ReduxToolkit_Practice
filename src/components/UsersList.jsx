import {useGetUsersQuery} from "../services/apiSlice.js";

export default function UsersList() {
  const {data: users, error, isLoading} = useGetUsersQuery();

  if (isLoading) return <p>Загрузка</p>
  if (error) return <i>Ошибка</i>
  return (
    <>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </>
  )
}
