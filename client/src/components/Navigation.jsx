import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <div className="logo">TODO 3.O</div>
      <nav>
        <ul>
          <li>
            <NavLink className="nav_link" to="/" aria-label="Wallet">
              Wallet
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/view-all-tasks" aria-label="View All Tasks">
              View All Tasks
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/create-task" aria-label="Create Task">
              Create Task
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/view-task" aria-label="View Task">
              View Task
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/update-task" aria-label="Update Task">
              Update Task
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/delete-task" aria-label="Delete Task">
              Delete Task
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
