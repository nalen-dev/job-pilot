"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useActionState } from "react";
import { editProfileAction } from "../action";

export default function FormEdit({ session }) {
  const [state, action, pending] = useActionState(editProfileAction, null);
  const [fileName, setFileName] = useState("");

  return (
    <main>
      <div className="max-w-4xl mt-10 mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Basic Information
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This is your personal information that you can update anytime.
            </p>
          </CardHeader>
          <form action={action}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
                <div className="shrink-0">
                  <Image
                    src={session?.user?.avatar || "/images/blank.png"}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover aspect-square"
                  />
                </div>
                <label
                  htmlFor="profile-upload"
                  className="border-2 border-dashed border-cv-primary px-6 py-4 rounded-md w-full text-center text-sm text-muted-foreground cursor-pointer"
                >
                  <UploadIcon className="mx-auto mb-2 text-cv-primary" />
                  <span className="text-cv-primary font-medium">
                    Click to replace
                  </span>
                  <br />
                  SVG, PNG, JPG or GIF (max. 400 x 400px)
                  <input
                    id="profile-upload"
                    type="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFileName(file.name);
                      } else {
                        setFileName("");
                      }
                    }}
                  />
                  {fileName && (
                    <p className="mt-2 text-blue-600 font-semibold">
                      {fileName}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    defaultValue={session.user.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" value={session.user.email} disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={pending}
                  type="submit"
                  className="bg-cv-primary text-white hover:bg-cv-primary/80 cursor-pointer"
                >
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </main>
  );
}
