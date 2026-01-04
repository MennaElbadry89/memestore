const callouts = [
  {
    name: 'Bags',
    description: 'Luxury bags crafted to perfection.',
    imageSrc: '/image/21.jpg',
    imageAlt: 'Luxury bags crafted to perfection.',
    href: '/shop',
  },
  {
    name: 'Shoes',
    description: 'Step into style with our latest shoe collection.',
    imageSrc: '/image/33.jpg',
    imageAlt: 'Step into style with our latest shoe collection.',
    href: '/shop',
  },
  {
    name: 'Clothes',
    description: 'Fashion-forward styles for every day.',
    imageSrc: '/image/7.jpg',
    imageAlt: 'Fashion-forward styles for every day.',
    href: '/shop',
  },
]

export default function Categories() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="sm:aspect-2/1 w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
