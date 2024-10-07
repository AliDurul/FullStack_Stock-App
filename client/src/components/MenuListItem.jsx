import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import InventoryIcon from "@mui/icons-material/Inventory"
import StoreIcon from "@mui/icons-material/Store"
import StarsIcon from "@mui/icons-material/Stars"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import { useNavigate } from 'react-router-dom';

const MenuListItem = () => {

    const navigate = useNavigate()

    const icons = [
        {
            icon: <DashboardCustomizeIcon />,
            title: "Dashboard",
            url: "/stock/",
        },
        {
            title: "Purchase",
            icon: <ShoppingCartIcon />,
            url: "/stock/purchases/",
        },
        {
            title: "Sales",
            icon: <AttachMoneyIcon />,
            url: "/stock/sales/",
        },
        {
            title: "Firms",
            icon: <StoreIcon />,
            url: "/stock/firms/",
        },
        {
            title: "Brands",
            icon: <StarsIcon />,
            url: "/stock/brands/",
        },
        {
            title: "Products",
            icon: <InventoryIcon />,
            url: "/stock/products/",
        },
        // {
        //     title: "Admin Panel",
        //     icon: <SupervisorAccountIcon />,
        //     url: "https://11510.fullstack.clarusway.com/admin",
        // },
    ]


    return (
        <div>
            <List >
                {icons.map((item, index) => (
                    <ListItem onClick={() => {
                        item.url.includes('http' || 'www' )
                        ? window.open(item.url, "_blank")
                        : navigate(item.url)
                    }}
                        key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: "white",
                                "& .MuiSvgIcon-root": { color: "white" },
                                "&:hover": { color: "red" },
                                "&:hover .MuiSvgIcon-root": { color: "red" }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default MenuListItem