"use client"

export default function DocumentationPage() {

  return (
    <div className={`min-h-screen`}>


      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            <div className="p-4 rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold">Getting Started</h2>
            </div>
            <div className="p-4">
              <h2 className="text-lg">Dependencies</h2>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Getting Started</h1>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">What is Lorem Ipsum?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <h2 className="text-2xl font-semibold">Why do we use it?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and
              a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>

            <h2 className="text-2xl font-semibold">Where does it come from?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
              Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
              undoubtable source.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

