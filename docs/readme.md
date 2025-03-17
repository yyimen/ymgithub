github actions ci

| 虚拟机                 | CPU    | Memory | SSD   | 架构  | Workflow Label                                                                    |
| ---------------------- | ------ | ------ | ----- | ----- | --------------------------------------------------------------------------------- |
| Linux                  | 4      | 16 GB  | 14 GB | x64   | ubuntu-latest<br/>ubuntu-24.04<br/>ubuntu-22.04<br/>ubuntu-20.04                  |
| Windows                | 4      | 16 GB  | 14 GB | x64   | `windows-latest`, `windows-2025` [Public preview], `windows-2022`, `windows-2019` |
| Linux [Public preview] | 4      | 16 GB  | 14 GB | arm64 | `ubuntu-24.04-arm`, `ubuntu-22.04-arm`                                            |
| macOS (Intel)          | 4      | 14 GB  | 14 GB | Intel | `macos-13`                                                                        |
| macOS (M1)             | 3 (M1) | 7 GB   | 14 GB | arm64 | `macos-latest`, `macos-14`, `macos-15` [Public preview]                           |

```
#   ymHelloWorld:
#     env:
#       CI: true

#     # runs-on: ubuntu-latest # ubuntu-22.04-arm-os
#     # runs-on: windows-latest # windows-2022 windows-2019 windows-2025
#     # runs-on: ubuntu-24.04-arm
#     runs-on: ${{ matrix.os }}

#     # 构建策略矩阵
#     strategy:
#       matrix:
#         # node-version: [21.6.1]
#         node-version: [18.18.2]
#         os: [ ubuntu-24.04-arm, windows-2022, ubuntu-24.04]

#     steps:
#     - uses: actions/checkout@v2
#     - name: Use Node.js ${{ matrix.node-version }}
#       uses: actions/setup-node@v1 # 这个是使用官方制作好的action https://github.com/marketplace?type=actions
#       with:
#         node-version: ${{ matrix.node-version }}
#     - run: node -v
#     - run: npm install
#     # - run: npm run build --if-present
#     - run: npm test

```
# mc ok
```yml
    steps:
      # 检出代码
      - name: Checkout code
        uses: actions/checkout@v3

      # 下载 mc
      - name: Download mc
        run: |
          Invoke-WebRequest -Uri https://dl.min.io/client/mc/release/windows-amd64/mc.exe -OutFile mc.exe
        shell: powershell

      # 将 mc 所在目录添加到环境变量
      - name: Add mc to PATH
        run: |
          $env:PATH = "$env:PATH;$PWD"
          [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH, [System.EnvironmentVariableTarget]::Process)
        shell: powershell

      # 验证 mc 安装
      - name: Verify mc installation
        run: |
          Get-Location
          cmd /c dir 
          ./mc.exe alias set ymminio https://minio.hy.yyimen.com:89 '' ''
          ./mc.exe ls ymminio/temp
          ./mc.exe cp ./mc.exe ymminio/temp
        shell: powershell
```        