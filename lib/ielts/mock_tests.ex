defmodule Ielts.MockTests do
  @moduledoc "Hardcoded mock test data organized by book versions"

  def list_versions do
    [
      %{key: :v5, label: "Version 5"},
      %{key: :v4, label: "Version 4"},
      %{key: :v3, label: "Version 3"},
      %{key: :v2, label: "Version 2"},
      %{key: :v1, label: "Version 1"}
    ]
  end

  def list_tests(version_key) do
    all_tests()
    |> Enum.filter(&(&1.version == version_key))
  end

  def free_version, do: :v1

  defp all_tests do
    [
      %{
        id: "v1-mock1",
        title: "Mock Test 1",
        version: :v1,
        version_label: "Version 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: true
      },
      %{
        id: "v1-mock2",
        title: "Mock Test 2",
        version: :v1,
        version_label: "Version 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v2-mock1",
        title: "Mock Test 1",
        version: :v2,
        version_label: "Version 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v2-mock2",
        title: "Mock Test 2",
        version: :v2,
        version_label: "Version 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v3-mock1",
        title: "Mock Test 1",
        version: :v3,
        version_label: "Version 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v3-mock2",
        title: "Mock Test 2",
        version: :v3,
        version_label: "Version 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v3-mock3",
        title: "Mock Test 3",
        version: :v3,
        version_label: "Version 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v4-mock1",
        title: "Mock Test 1",
        version: :v4,
        version_label: "Version 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v4-mock2",
        title: "Mock Test 2",
        version: :v4,
        version_label: "Version 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v4-mock3",
        title: "Mock Test 3",
        version: :v4,
        version_label: "Version 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v5-mock1",
        title: "Mock Test 1",
        version: :v5,
        version_label: "Version 5",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v5-mock2",
        title: "Mock Test 2",
        version: :v5,
        version_label: "Version 5",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      },
      %{
        id: "v5-mock3",
        title: "Mock Test 3",
        version: :v5,
        version_label: "Version 5",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        duration_minutes: 165,
        is_free: false
      }
    ]
  end
end
