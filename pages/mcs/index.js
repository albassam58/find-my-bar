import Link from 'next/link';

export default function Mcs({ mcs }) {
    return (
      <div class="p-4 mx-auto mt-12 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Artists</h5>
            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                View all
            </a>
        </div>
        <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  mcs.map((mc) => (
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {mc.stageName}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {mc.firstName} {mc.lastName}
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {mc.reppin}
                            </div>
                        </div>
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