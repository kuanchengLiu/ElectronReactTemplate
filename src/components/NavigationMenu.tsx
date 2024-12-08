import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <div className="navigation-menu">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/server">Server</Link></li>
            </ul>
        </div>
    );
};

export default NavigationMenu;
