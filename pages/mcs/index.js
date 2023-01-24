import Link from 'next/link';

export default function Mcs({ mcs }) {
  return (
    <div className="p-4 mx-auto mt-12 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Artists</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {
            mcs.map((mc) => (
              <li className="py-3 sm:py-4">
                <Link href={`/mcs/${mc._id}`}>
                  <a>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {mc.stageName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {mc.firstName} {mc.lastName}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {mc.reppin}
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request bars from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mcs`);
  // extract the data
  let { data } = await response.json();

  return {
    props: {
      mcs: data,
    },
  };
}