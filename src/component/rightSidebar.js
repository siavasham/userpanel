import React, { useState, useEffect } from "react";
import { t } from "locales";
import useStorage from "reducer";

export default function () {
  const [loading, setLoading] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div class="d-flex flex-column">
      <a
        href="/"
        class="d-block p-3 link-dark text-decoration-none"
        title="Icon-only"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        gggg
        <span class="visually-hidden">Icon-only</span>
      </a>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <a
            href="#"
            class="nav-link active py-3 border-bottom"
            title="Home"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            yyyy
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            bbb
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom"
            title="Orders"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            vvv
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom"
            title="Products"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            xx
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link py-3 border-bottom"
            title="Customers"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            xx
          </a>
        </li>
      </ul>
      <div class="dropdown border-top">
        <a
          href="#"
          class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="mdo"
            width="24"
            height="24"
            class="rounded-circle"
          />
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser3"
        >
          <li>
            <a class="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
