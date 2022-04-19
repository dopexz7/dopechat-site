import React from "react";
import Link from "next/link";
export default function Terms() {
  return (
    <div className="w-screen text-sm p-10 bg-white text-main-black ">
      <div className="w-screen max-w-7xl m-auto flex flex-col">
        <div className="flex flex-row items-center space-x-3">
          <Link href="/" passHref>
            <div className="text-xl mt-3 cursor-pointer hover:text-main-purple duration-300">
              Back to Home
            </div>
          </Link>
          <Link href="/dashboard" passHref>
            <div className="text-xl mt-3 cursor-pointer hover:text-main-purple duration-300">
              Dashboard
            </div>
          </Link>
        </div>
        <h1 className="text-5xl mt-14 mb-3">
          Website Terms and Conditions of Use
        </h1>
        <p className="text-base">Last updated: April 17, 2022</p>
        <h2 className="text-3xl mt-6">1. Terms</h2>
        <p>
          By accessing this Website, accessible from https://dopechat.ddns.net/,
          you are agreeing to be bound by these Website Terms and Conditions of
          Use and agree that you are responsible for the agreement with any
          applicable local laws. If you disagree with any of these terms, you
          are prohibited from accessing this site. The materials contained in
          this Website are protected by copyright and trade mark law.
        </p>
        <h2 className="text-3xl mt-6">2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on dopeChat&apos;s Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>-modify or copy the materials</li>
          <li>
            -use the materials for any commercial purpose or for any public
            display
          </li>
          <li>
            -attempt to reverse engineer any software contained on
            dopeChat&apos;s Website
          </li>
          <li>
            -remove any copyright or other proprietary notations from the
            materials
          </li>
          <li>
            -or transferring the materials to another person or
            &quot;mirror&quot; the materials on any other server.
          </li>
        </ul>
        <p className="mt-3">
          This will let dopeChat to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be
          terminated and you should destroy any downloaded materials in your
          possession whether it is printed or electronic format.
        </p>

        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl ">3. Disclaimer</h2>
          <p>
            All the materials on dopeChat’s Website are provided &quot;as
            is&quot;. dopeChat makes no warranties, may it be expressed or
            implied, therefore negates all other warranties. Furthermore,
            dopeChat does not make any representations concerning the accuracy
            or reliability of the use of the materials on its Website or
            otherwise relating to such materials or any sites linked to this
            Website.
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">4. Limitations</h2>
          <p>
            dopeChat or its suppliers will not be hold accountable for any
            damages that will arise with the use or inability to use the
            materials on dopeChat&apos;s Website, even if dopeChat or an
            authorize representative of this Website has been notified, orally
            or written, of the possibility of such damage. Some jurisdiction
            does not allow limitations on implied warranties or limitations of
            liability for incidental damages, these limitations may not apply to
            you.
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">5. Revisions and Errata</h2>
          <p>
            The materials appearing on dopeChat’s Website may include technical,
            typographical, or photographic errors. dopeChat will not promise
            that any of the materials in this Website are accurate, complete, or
            current. dopeChat may change the materials contained on its Website
            at any time without notice. dopeChat does not make any commitment to
            update the materials.
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">6. Links</h2>
          <p>
            dopeChat has not reviewed all of the sites linked to it&apos;s
            Website and is not responsible for the contents of any such linked
            site. The presence of any link does not imply endorsement by
            dopeChat of the site. The use of any linked website is at the
            user&apos;s own risk.
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">7. Site Terms of Use Modifications</h2>
          <p>
            dopeChat may revise these Terms of Use for its Website at any time
            without prior notice. By using this Website, you are agreeing to be
            bound by the current version of these Terms and Conditions of Use.
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">8. Your Privacy</h2>
          <p>
            Please read our{" "}
            <Link href="/legal/privacy" passHref>
              <span className="font-semibold cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col space-y-1 mt-6">
          <h2 className="text-3xl mt-6">9. Governing Law</h2>
          <p>
            Any claim related to dopeChat&apos;s Website shall be governed by
            the laws of lt without regards to its conflict of law provisions.
          </p>
        </div>
      </div>
    </div>
  );
}
