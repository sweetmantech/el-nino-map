const SpinampPlayer = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed w-full h-full left-0 top-0 z-[1000] p-6 flex justify-start"
      onClick={(e) => (e.target === e.currentTarget ? onClose() : () => {})}
    >
      <div>
        <iframe
          src="https://app.spinamp.xyz/embed/playlist/aTvyA2uKy8Z5CbI3vRlW?colors=%7B%22primaryLight%22%3A%22%233d4ea3%22%2C%22primary%22%3A%22%232f3c7e%22%2C%22primaryDark%22%3A%22%23212a59%22%2C%22backgroundLight%22%3A%22%23000000%22%2C%22background%22%3A%22%23f0eaeb%22%2C%22backgroundDark%22%3A%22%23dbcccf%22%2C%22backdrop%22%3A%22rgba%280%2C0%2C0%2C0.65%29%22%2C%22borderColor%22%3A%22%232f3c7e%22%2C%22invertedBorderColor%22%3A%22%23f0eaeb%22%2C%22textColor%22%3A%22%234281ff%22%2C%22invertedTextColor%22%3A%22%23b3001e%22%2C%22active%22%3A%22%2366d1ff%22%2C%22activeBorder%22%3A%22%232f3c7e%22%2C%22activeText%22%3A%22%232f3c7e%22%2C%22favoritesColor%22%3A%22%23ff0000%22%7D"
          scrolling="no"
          allow="autoplay; fullscreen; web-share"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-presentation"
          width="250px"
          height="350px"
        />
      </div>
    </div>
  )
}

export default SpinampPlayer
