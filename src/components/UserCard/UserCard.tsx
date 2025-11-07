interface UserCardProps {
  username: string
}

export default function UserCard(props: UserCardProps) {
  const userInitials = []
  const listNames = props.username.split(' ');
  for (let i = 0; i < listNames.length; i++) {
    if (i === 2) {
      break
    } else {
      userInitials.push(listNames[i][0].toUpperCase())
    }
  }

  return (
    <div className="flex items-center justify-center gap-[5px] p-[5px] w-fit h-fit border-[1px] border-black rounded-full text-[.8rem]">
      <div className="bg-gray-200 h-[28px] w-[28px] rounded-full flex items-center justify-center text-black">
        {userInitials}
      </div>
      <p>{props.username}</p>
    </div>
  )
}