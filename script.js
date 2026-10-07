// CLOCK

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

// DIALOG SYSTEM

document.addEventListener("DOMContentLoaded", () => {
  const dialogSettings = {
    "welcome-dialog": {
      left: 300,
      top: 150,
      center: true,
      openOnLoad: true
    },

    "how-to-dialog": {
      left: 750,
      top: 150,
      center: false
    },

    "about-dialog": {
      left: 250,
      top: 150,
      center: false
    },

    "work-dialog": {
      left: 300,
      top: 100,
      center: false
    },

    "writing-dialog": {
      left: 700,
      top: 60,
      center: false
    },

    "playground-dialog": {
      left: 600,
      top: 300,
      center: false
    },

    "contact-dialog": {
      left: 350,
      top: 150,
      center: false
    },

    "games-dialog": {
      left: 700,
      top: 250,
      center: false
    },

    "music-dialog": {
      left: 200,
      top: 300,
      center: false
    },

    "photos-dialog": {
      left: 800,
      top: 350,
      center: false
    },

    "AOIN-dialog": {
      left: 150,
      top: 200,
      center: false
    },

    "semify-dialog": {
      left: 450,
      top: 110,
      center: false
    },

    "CCSWCD-dialog": {
      left: 400,
      top: 90,
      center: false
    },

    "NORA-dialog": {
      left: 100,
      top: 100,
      center: false
    },

    "moon-dialog": {
      left: 750,
      top: 300,
      center: false
    },

    "future-great-dialog": {
      left: 400,
      top: 400,
      center: false
    }
  };

  // STACKING

  let highestZIndex = 1000;

  function bringToFront(dialog) {
    dialog.style.zIndex = ++highestZIndex;
  }

  // POSITIONING

  function centerDialog(dialog) {
    dialog.style.left = `${(window.innerWidth - dialog.offsetWidth) / 2}px`;

    dialog.style.top = `${(window.innerHeight - dialog.offsetHeight) / 2}px`;
  }

  function positionDialog(dialog, settings) {
    if (settings.center) {
      centerDialog(dialog);
    } else {
      dialog.style.left = `${settings.left}px`;
      dialog.style.top = `${settings.top}px`;
    }
  }

  // GLOBAL DRAGGING

  let draggedDialog = null;
  let draggedHeader = null;

  let offsetX = 0;
  let offsetY = 0;

  // Start dragging

  document.addEventListener("mousedown", (e) => {
    const header = e.target.closest("dialog > *");

    if (!header) {
      return;
    }

    const dialog = header.closest("dialog");

    if (!dialog) {
      return;
    }

    // Only allow dragging from the designated header
    if (!header.id.endsWith("-header")) {
      return;
    }

    // Don't drag when clicking the close button
    if (e.target.closest(".close-button")) {
      return;
    }

    if (!dialog.open) {
      return;
    }

    bringToFront(dialog);

    const rect = dialog.getBoundingClientRect();

    draggedDialog = dialog;
    draggedHeader = header;

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    draggedHeader.style.cursor = "grabbing";

    e.preventDefault();
  });

  // Drag

  document.addEventListener("mousemove", (e) => {
    if (!draggedDialog) {
      return;
    }

    draggedDialog.style.left = `${e.clientX - offsetX}px`;

    draggedDialog.style.top = `${e.clientY - offsetY}px`;
  });

  // Stop dragging

  document.addEventListener("mouseup", () => {
    if (!draggedDialog) {
      return;
    }

    draggedHeader.style.cursor = "";

    draggedDialog = null;
    draggedHeader = null;
  });

  // INITIALIZE DIALOGS

  Object.entries(dialogSettings).forEach(([dialogId, settings]) => {
    const dialog = document.getElementById(dialogId);

    if (!dialog) {
      return;
    }

    const closeButton = document.getElementById(`close-${dialogId}-btn`);

    // Find both the normal open button and numbered open buttons.
    //
    // Matches:
    // open-how-to-dialog-btn
    // open-how-to-dialog-btn-1
    // open-how-to-dialog-btn-2
    // open-how-to-dialog-btn-3
    //
    // Does NOT match unrelated IDs.

    const openButtons = document.querySelectorAll(
      `[id="open-${dialogId}-btn"], [id^="open-${dialogId}-btn-"]`
    );

    // Initial position

    positionDialog(dialog, settings);

    // Open buttons

    openButtons.forEach((openButton) => {
      openButton.addEventListener("click", () => {
        dialog.show();

        positionDialog(dialog, settings);

        bringToFront(dialog);
      });
    });

    // Close button

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        dialog.close();
      });
    }

    // Click dialog to bring it to front

    dialog.addEventListener("mousedown", () => {
      bringToFront(dialog);
    });

    // Open on page load

    if (settings.openOnLoad) {
      dialog.show();

      positionDialog(dialog, settings);

      bringToFront(dialog);
    }
  });
});
