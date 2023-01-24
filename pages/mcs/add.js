import { useState } from 'react';
import { Alert, Label, TextInput } from 'flowbite-react';

export default function AddMc() {
  const [form, setForm] = useState({
    stageName: "",
    realFirstName: "",
    realLastName: "",
    reppin: "",
    address: "",
  })
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    // if (!form.stageName || !form.address) return setError('Please input required fields.');

    // post structure
    const newMc = { ...form, createdAt: new Date().toISOString() }

    // save the post
    let response = await fetch('/api/mcs/add', {
      method: 'POST',
      body: JSON.stringify(newMc),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setForm({
        stageName: "",
        address: "",
        reppin: ""
      });
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handlePost}>
          {error ? (
            // <div className="flex p-4 mb-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            //   <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            //   <span className="sr-only">Info</span>
            //   <div>
            //     {error}
            //   </div>
            // </div>
            <Alert
              color="failure"
              onDismiss={function onDismiss() { setError('') }}
            >
              <span>
                <span className="font-medium">
                  Alert!
                </span>
                {' ' + error}
              </span>
            </Alert>
          ) : null}
          {message ? (
            <Alert
              color="success"
              onDismiss={function onDismiss() { setMessage('') }}
            >
              <span>
                <span className="font-medium">
                  Info!
                </span>
                {' ' + message}
              </span>
            </Alert>
          ) : null}
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="stageName"
                value="Stage Name"
              />
            </div>
            <TextInput
              id="stageName"
              type="text"
              placeholder="Stage Name"
              value={form.stageName}
              onChange={(e) => updateForm({ stageName: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="realFirstName"
                  value="First Name"
                />
              </div>
              <TextInput
                id="realFirstName"
                type="text"
                placeholder="First Name"
                value={form.realFirstName}
                onChange={(e) => updateForm({ realFirstName: e.target.value })}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="realLastName"
                  value="Last Name"
                />
              </div>
              <TextInput
                id="realLastName"
                type="text"
                placeholder="Last Name"
                value={form.realLastName}
                onChange={(e) => updateForm({ realLastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="address"
                value="Address"
              />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => updateForm({ address: e.target.value })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="reppin"
                value="Reppin"
              />
            </div>
            <TextInput
              id="reppin"
              type="text"
              placeholder="Reppin"
              value={form.reppin}
              onChange={(e) => updateForm({ reppin: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add MC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}