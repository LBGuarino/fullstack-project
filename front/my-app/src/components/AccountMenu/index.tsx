import { useAuth } from "@/context/usersContext";
import { Button, Divider, Drawer, IconButton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { dashboardConfig } from "./dashboardConfig";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserIcon } from "@heroicons/react/outline";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const { user, logout } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleMouseEnter = (itemId: number) => {
    setHovered(itemId);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleLogout = () => {
    logout();
  };

  const DrawerList = (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center px-4 py-6 bg-white shadow-sm">
        <Image src="/user.svg" alt="user" width={28} height={28} className="rounded-full" />
        <p className="mt-3 text-base font-medium text-gray-800">
          Welcome, {user?.name} 👋
        </p>
      </div>

      <Divider />

      <ul className="flex-1 overflow-y-auto px-4 py-2">
        {dashboardConfig.map((item) => {
          const isMyProfile = item.name === "My Profile";

          return (
            <div 
              key={item.id} 
              className="mb-2"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`
                  py-2 px-2 rounded-md 
                  transition-colors 
                  ${hovered === item.id ? "bg-cyan-50" : "hover:bg-gray-100"}
                `}
              >
                <li>
                  <Link
                    href={item.path ?? "#"}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    {item.name}
                  </Link>
                </li>
              </div>

              {item.subTitles?.length ? (
                isMyProfile ? (
                  <ul
                    className={`
                      ml-4 border-l border-gray-200 
                      hidden md:block
                      overflow-hidden
                      transition-all duration-300
                      transform origin-top
                      ${hovered === item.id ? "max-h-40 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"}
                    `}
                  >
                    {item.subTitles.map((subItem) => (
                      <li key={subItem.id} className="pl-2 py-1 text-right">
                        <Link
                          href={subItem.path ?? "#"}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="ml-4 border-l border-gray-200 hidden md:block">
                    {item.subTitles.map((subItem) => (
                      <li key={subItem.id} className="pl-2 py-1 text-right">
                        <Link
                          href={subItem.path ?? "#"}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              ) : null}
            </div>
          );
        })}
      </ul>

      <Divider />

      <div className="px-4 py-3 flex items-center justify-between">
        <IconButton onClick={handleLogout} className="flex items-center gap-1">
          <LogoutIcon sx={{ fontSize: 20 }} />
          <p className="text-sm">Logout</p>
        </IconButton>

        <IconButton className="flex items-center gap-1">
          <p className="text-sm">Need Help?</p>
        </IconButton>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="flex flex-row gap-2"
      >
        <UserIcon
          className="
            w-6 h-6
            hover:transform 
            hover:scale-125 
            transition-all 
            duration-200 
            ease-in-out
          "
        />
      </button>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: { xs: "80vw", sm: 300 },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(6px)",
            width: { xs: "80vw", sm: 300 },
            boxSizing: "border-box",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
